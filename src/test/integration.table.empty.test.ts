import { MdParser } from '../MdParser'
import { JSDOM } from 'jsdom'

describe('Integration Test: HTML Structure Broken by Empty Tables', () => {
  const parser = MdParser()

  const createTestReport = (includeFindings: {
    problem?: boolean
    warning?: boolean
    ok?: boolean
  }) => {
    const findings = []

    if (includeFindings.problem) {
      findings.push(`--- finding
id: TEST-001
title: Example security issue
resolution: Open
likelihood: high
impact: high
location: "src/example.js"

#### Description
This is a test finding with pending resolution.

#### Recommendation
Fix the issue immediately.

#### Status
Open - requires immediate attention.

/--`)
    }

    if (includeFindings.warning) {
      findings.push(`--- finding
id: TEST-002
title: Example caution advisory
resolution: Partially Fixed
likelihood: medium
impact: low
location: "src/utils.js"

#### Description
This is a test finding where caution is advised.

#### Recommendation
Monitor the situation closely.

#### Status
Partially Fixed - some measures taken.

/--`)
    }

    if (includeFindings.ok) {
      findings.push(`--- finding
id: TEST-003
title: Example resolved issue
resolution: Fixed
likelihood: low
impact: low
location: "src/security.js"

#### Description
This is a test finding that has been resolved.

#### Recommendation
No further action needed.

#### Status
Fixed - issue completely resolved.

/--`)
    }

    return `--- metadata
customerName: Test Client
reportType: Source Code Audit
productName: Test Application Security Review
date: July 2025
version: v1.0.0
coverFile: cover.svg

/--

[[report-header]]

# Security Assessment

[[toc]]

## 1. Executive Summary

In **July 2025**, [**Test Client**](https://example.com/) engaged [Security Firm](https://security.com) 
to perform a Source Code Audit of the Test Application. 
The objective was to evaluate the security of the application and identify potential vulnerabilities.

[[finding-resume-status]]

## 2. Summary of Findings

This section provides an overview of all findings grouped by status and sorted by risk.

### 2.1 Findings with pending resolution

These findings require immediate action and must be addressed.

[[name: finding-table-status-problem
removeUntil: 3
]]

### 2.2 Findings where caution is advised

These issues have been partially addressed but require ongoing attention.

[[name: finding-table-status-warning
removeUntil: 3
]]

### 2.3 Solved issues & recommendations

These issues have been fully resolved.

[[name: finding-table-status-ok
removeUntil: 3
]]

## 3. Scope 

The scope included the main application repository at commit abc123.

## 4. Assessment 

The assessment covered security vulnerabilities and code quality issues.

### 4.1 Security assumptions 

1. The application is deployed in a secure environment
2. Access controls are properly implemented
3. Input validation is consistently applied

## 5. Detailed Findings

${findings.join('\n\n')}

## 6. Disclaimer

This report is provided "as is" without warranty of any kind.
The assessment represents a point-in-time evaluation.
`
  }

  describe('HTML structure broken by empty tables', () => {
    it('should keep section 3 (Scope) as a proper sibling, not nested inside table divs', () => {
      const md = createTestReport({ problem: true, warning: false, ok: false })
      const html = parser.render(md)
      const dom = new JSDOM(html)
      const container = dom.window.document.body

      // Find the "3. Scope" section
      const scopeSection = Array.from(container.querySelectorAll('h2')).find(
        (h2) => h2.textContent?.includes('Scope')
      )

      expect(scopeSection).not.toBeNull()

      // Check that the scope section is NOT nested inside any table-related divs
      const tableStatusDivs = container.querySelectorAll(
        'div[class*="finding-table-status"]'
      )

      for (const tableDiv of tableStatusDivs) {
        const scopeInsideTable = tableDiv.querySelector('h2')
        if (
          scopeInsideTable &&
          scopeInsideTable.textContent?.includes('Scope')
        ) {
          throw new Error(
            `Scope section should not be nested inside table div: ${tableDiv.className}`
          )
        }
      }

      // Verify the scope section is a direct child of the main container structure
      // and not accidentally nested inside table divs
      const scopeParent = scopeSection?.parentElement
      expect(scopeParent).not.toBeNull()

      // The scope section should not be inside any finding-table-status div
      let currentParent = scopeParent
      while (currentParent && currentParent !== container) {
        expect(currentParent.className).not.toMatch(/finding-table-status/)
        currentParent = currentParent.parentElement
      }
    })

    it('should maintain proper section hierarchy when warning table is empty', () => {
      const md = createTestReport({ problem: true, warning: false, ok: true })
      const html = parser.render(md)
      const dom = new JSDOM(html)
      const container = dom.window.document.body

      // Get all h2 sections in order
      const h2Sections = Array.from(container.querySelectorAll('h2')).map(
        (h2) => h2.textContent?.trim()
      )

      // Find indexes to check order
      const scopeIndex = h2Sections.findIndex((title) =>
        title?.includes('Scope')
      )
      const summaryIndex = h2Sections.findIndex((title) =>
        title?.includes('Summary of Findings')
      )
      const assessmentIndex = h2Sections.findIndex((title) =>
        title?.includes('Assessment')
      )

      // Scope should come after Summary of Findings and before Assessment
      expect(scopeIndex).toBeGreaterThan(summaryIndex)
      expect(assessmentIndex).toBeGreaterThan(scopeIndex)
    })

    it('should maintain proper section hierarchy when ok table is empty', () => {
      const md = createTestReport({ problem: true, warning: true, ok: false })
      const html = parser.render(md)
      const dom = new JSDOM(html)
      const container = dom.window.document.body

      // Get all h2 sections in order
      const h2Sections = Array.from(container.querySelectorAll('h2')).map(
        (h2) => h2.textContent?.trim()
      )

      // Find indexes to check order
      const scopeIndex = h2Sections.findIndex((title) =>
        title?.includes('Scope')
      )
      const summaryIndex = h2Sections.findIndex((title) =>
        title?.includes('Summary of Findings')
      )
      const assessmentIndex = h2Sections.findIndex((title) =>
        title?.includes('Assessment')
      )

      // Scope should come after Summary of Findings and before Assessment
      expect(scopeIndex).toBeGreaterThan(summaryIndex)
      expect(assessmentIndex).toBeGreaterThan(scopeIndex)
    })

    it('should maintain proper section hierarchy when problem table is empty', () => {
      const md = createTestReport({ problem: false, warning: true, ok: true })
      const html = parser.render(md)
      const dom = new JSDOM(html)
      const container = dom.window.document.body

      // Get all h2 sections in order
      const h2Sections = Array.from(container.querySelectorAll('h2')).map(
        (h2) => h2.textContent?.trim()
      )

      // Find indexes to check order
      const scopeIndex = h2Sections.findIndex((title) =>
        title?.includes('Scope')
      )
      const summaryIndex = h2Sections.findIndex((title) =>
        title?.includes('Summary of Findings')
      )
      const assessmentIndex = h2Sections.findIndex((title) =>
        title?.includes('Assessment')
      )

      // Scope should come after Summary of Findings and before Assessment
      expect(scopeIndex).toBeGreaterThan(summaryIndex)
      expect(assessmentIndex).toBeGreaterThan(scopeIndex)
    })

    it('should remove empty sections when removeUntil is specified', () => {
      const md = createTestReport({ problem: false, warning: false, ok: false })
      const html = parser.render(md)
      const dom = new JSDOM(html)
      const container = dom.window.document.body

      // Check that placeholder text is NOT present in the final HTML
      expect(html).not.toContain('[[name: finding-table-status-problem')
      expect(html).not.toContain('[[name: finding-table-status-warning')
      expect(html).not.toContain('[[name: finding-table-status-ok')
      expect(html).not.toContain('removeUntil:')

      // Check that empty sections are completely removed (including headings)
      const h3Sections = Array.from(container.querySelectorAll('h3')).map(
        (h3) => h3.textContent?.trim()
      )

      // These sections should be completely removed when tables are empty
      expect(
        h3Sections.some((title) =>
          title?.includes('Findings with pending resolution')
        )
      ).toBe(false)
      expect(
        h3Sections.some((title) =>
          title?.includes('Findings where caution is advised')
        )
      ).toBe(false)
      expect(
        h3Sections.some((title) =>
          title?.includes('Solved issues & recommendations')
        )
      ).toBe(false)

      // But the main sections should still exist
      const h2Sections = Array.from(container.querySelectorAll('h2')).map(
        (h2) => h2.textContent?.trim()
      )
      expect(
        h2Sections.some((title) => title?.includes('Summary of Findings'))
      ).toBe(true)
      expect(h2Sections.some((title) => title?.includes('Scope'))).toBe(true)
      expect(h2Sections.some((title) => title?.includes('Assessment'))).toBe(
        true
      )
    })
  })
})
