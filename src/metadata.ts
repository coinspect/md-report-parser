import yaml from 'yaml'
import { parseFinding } from './Findings'


const parseMetadata = (str: string) => yaml.parse(str)

const validateMetadata = (metadata: string | { impact: any; likelihood: any } | undefined, type: any) => {
  if (typeof metadata !== 'object') return metadata
  switch (type) {
    case 'finding':
      metadata = parseFinding(metadata)
      break
  }
  return metadata
}

export const MetadataParser = ({ metadataCb } = {}) => (str: string, { blockType }: any) => {
  const metadata = validateMetadata(parseMetadata(str), blockType)
  if (typeof metadataCb === 'function') {
    metadataCb(JSON.parse(JSON.stringify(metadata)))
  }
  return metadata
}

