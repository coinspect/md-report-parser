import { INFO, LOW, MEDIUM, HIGH, FINDING_STATUS } from '../constants'
import { sortDataByRisk } from '../templates/findingTemplates'
import { parseFinding } from '../Findings'

describe('sortDataByRisk', () => {
  const data = [
    [HIGH, HIGH, FINDING_STATUS.fixed],
    [MEDIUM, MEDIUM, FINDING_STATUS.fixed],
    [LOW, LOW, FINDING_STATUS.fixed],
    [HIGH, HIGH, FINDING_STATUS.acknowledged],
    [MEDIUM, MEDIUM, FINDING_STATUS.acknowledged],
    [LOW, LOW, FINDING_STATUS.acknowledged],
    [HIGH, HIGH, FINDING_STATUS.deferred],
    [MEDIUM, MEDIUM, FINDING_STATUS.deferred],
    [INFO, INFO, FINDING_STATUS.deferred],
    [HIGH, HIGH, FINDING_STATUS.open],
    [MEDIUM, MEDIUM, FINDING_STATUS.open],
    [LOW, LOW, FINDING_STATUS.open],
    [INFO, INFO, FINDING_STATUS.partiallyFixed],
    [MEDIUM, MEDIUM, FINDING_STATUS.partiallyFixed],
    [LOW, LOW, FINDING_STATUS.partiallyFixed]
  ].map(([likelihood, impact, resolution]) => {
    return { likelihood, impact, resolution }
  })
  const findings = data.map((f: any) => parseFinding(f))
  it('should sort findings by risk', () => {
    const sorted = sortDataByRisk(findings)
    const risks = [...new Set(sorted.map((x: any) => x.risk))]
    expect(risks).toStrictEqual([INFO, LOW, MEDIUM, HIGH])
  })
})