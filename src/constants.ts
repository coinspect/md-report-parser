export const CRITICAL = 'critical'
export const HIGH = 'high'
export const MEDIUM = 'medium'
export const LOW = 'low'
export const INFO = 'none'
export const ZERO = 'zero'
export const NONE = '_'
export const FINDING = 'finding'
export const FINDING_ID_SEPARATOR = '-'
export const TITLE_SEPARATOR = '-'
export const FINDING_ID_PREFIX_MIN_LENGTH = 3
export const FINDING_ID_DEFAULT_PREFIX = 'ISSUE'
export const FINDING_ID_ZERO_PADDING = 3
export const FINDING_TITLE_LEVEL = 3
export const FINDING_SECTIONS = ['Description', 'Recommendation', 'Status']
export const METADATA = 'metadata'
export const REPORT = 'report'
export const CONCERT_GENERIC_DOCUMENT = 'concert-doc'
export const TXT_PLACEHOLDER = '[...]'
export const TOTAL_RISK = 'risk'
export const ID = 'id'
export const IMACT_RATE = 'impactRate'
export const TITLE = 'title'
export const TOTAL = 'total'
export const NOT_FIXED = 'notFixed'
export const PARTIALLY_FIXED = 'partiallyFixed'
export const OPEN = 'open'
const ACKNOWLEDGED = 'acknowledged'
const DEFERRED = 'deferred'
export const FIXED_PERCENT = 'fixedPercent'
export const REPORTED = 'reported'
export const RESOLUTION = 'resolution'

export const STATUS_PROBLEM_LABEL = 'Resolution Pending'
export const STATUS_WARNING_LABEL = 'Caution Advised'
export const STATUS_OK_LABEL = 'Solved'

export const LIKELIHOOD_RATE = 'likelihoodRate'
export const RISK_RATE = 'riskRate'
export const FIXED = 'fixed'
export const LOCATION = 'location'
export const IMPACT_KEY = 'impact'
export const IMPACT = {
  [NONE]: 0,
  [LOW]: 1,
  [MEDIUM]: 2,
  [HIGH]: 3
}

export const LIKELIHOOD_KEY = 'likelihood'
export const LIKELIHOOD = { ...IMPACT }
/* eslint-disable @typescript-eslint/naming-convention */
export const RISK = {
  0: INFO,
  1: LOW,
  2: MEDIUM,
  3: HIGH
}
export const RISK_KEY = 'risk'

export const HEADINGS = [...Array(6)].map((x, i) => `h${i}`)

export const FINDING_LIST = 'finding-list'
export const FINDING_RESUME = 'finding-resume'
export const FINDING_HEADER = 'finding-header'
export const FINDING_RESUME_STATUS = 'finding-resume-status'

export const CUSTOMER_NAME = 'customerName'
export const REPORT_TYPE = 'reportType'
export const SMART_CONTRACT_AUDIT_KEY = 'Smart Contract Audit'
export const SOURCE_CODE_AUDIT_KEY = 'Source Code Audit'

export const REPORT_HEADER = 'report-header'

export const PRODUCT_NAME = 'productName'
export const REPORT_DATE = 'date'
export const REPORT_VERSION = 'version'
export const PRODUCT_NAME_PLACEHOLDER = 'PRODUCT_NAME'
export const CUSTOMER_NAME_PLACEHOLDER = 'CUSTOMER_NAME'
export const COVER_FILE = 'coverFile'
export const COVER_FILE_NAME = 'cover.svg'
export const TOC_INCLUDED_LEVELS = [2, 3]
export const STATUS = 'status'
export const CONDITION = 'condition'
export const REMEDIATION = 'resolution'
export const RECOMMENTATION = 'recommendation'
export const BUG = 'bug'
export const WARNING = 'warning'
const OK = 'ok'
const PROBLEM = 'problem'

export const SORTED_FINDING_FIELDS: string[] = [
  ID,
  TITLE,
  STATUS,
  REMEDIATION,
  TOTAL_RISK,
  LIKELIHOOD_KEY,
  IMPACT_KEY,
  LOCATION
]

export const CODE_MARK = '```'
export const TECH_BITS = 'tech-bits'
export const ALLOWED_INFO_IMPACT = [RECOMMENTATION, BUG, WARNING]
export const DEFAULT_INFO_IMPACT = RECOMMENTATION

export const STATUS_OPEN = 'Open'
export const STATUS_FIXED = 'Fixed'
export const STATUS_PARTIALLY_FIXED = 'Partially Fixed'
export const STATUS_ACKNOWLEDGED = 'Acknowledged'
export const STATUS_DEFERRED = 'Deferred'

export const FINDING_STATUS = {
  [OPEN]: STATUS_OPEN,
  [FIXED]: STATUS_FIXED,
  [PARTIALLY_FIXED]: STATUS_PARTIALLY_FIXED,
  [ACKNOWLEDGED]: STATUS_ACKNOWLEDGED,
  [DEFERRED]: STATUS_DEFERRED
} as const

export type FindingStatus = (typeof FINDING_STATUS)[keyof typeof FINDING_STATUS]

export const CONDITION_OK = OK
export const CONDITION_WARNING = WARNING
export const CONDITION_PROBLEM = PROBLEM

export const CONDITIONS = {
  [OK]: CONDITION_OK,
  [WARNING]: CONDITION_WARNING,
  [PROBLEM]: CONDITION_PROBLEM
} as const

export const STATUS_LABELS: { [key: string]: string } = {
  [OK]: STATUS_OK_LABEL,
  [WARNING]: STATUS_WARNING_LABEL,
  [PROBLEM]: STATUS_PROBLEM_LABEL
}

export const FIELD_LABELS: { [key: string]: { [key: string]: string } } = {
  [STATUS]: STATUS_LABELS
}

export type Condition = (typeof CONDITIONS)[keyof typeof CONDITIONS]

export const FH_ROW = 'fh-row'
export const FH_COL = 'fh-col'

export const FINDING_TABLE = 'findings-table'
export const REVERSE_FIELDS = '-'
export const FINDING_TABLE_STATUS_OK = 'finding-table-status-ok'
export const FINDING_TABLE_STATUS_WARNING = 'finding-table-status-warning'
export const FINDING_TABLE_STATUS_PROBLEM = 'finding-table-status-problem'
export const FINDING_TABLE_STATUS_FIELDS = ['id', 'title', 'risk']
export const FINDING_TABLE_STATUS_SORT = ['risk']

export const FINDING_STATUS_OK_TITLE = 'Solved issues & recommendations'
export const FINDING_STATUS_WARNING_TITLE = 'Findings where caution is advised'
export const FINDING_STATUS_PROBLEM_TITLE = 'Findings with pending resolution'

export const CLASS_NAMES = {
  label: 'label'
}

export const NO_RISK = 'no risk'

export const RISK_SHORT_DESCRIPTIONS: { [key: string]: string } = {
  [NONE]: NO_RISK,
  [INFO]: NO_RISK
}
