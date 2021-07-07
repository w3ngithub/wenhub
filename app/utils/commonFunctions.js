import { Input } from 'antd'
import parse from 'html-react-parser'

export function setFilterOptions(x) {
  return {
    label: `${x.name}(${x.count})`,
    value: x.id,
  }
}

export function getDataDetail(x, pType, pStat, developer, designer, pTag) {
  return {
    name: x.title.rendered,
    path: (
      <Input
        size="large"
        readOnly
        value={x.acf_fields.project_link}
        onFocus={(e) => e.target.select()}
        style={{
          backgroundColor: '#eee',
          fontSize: '0.8rem',
          fontWeight: 'bold',
        }}
      />
    ),
    live_url: x.acf_fields.live_url,
    staging_url: (
      <ul style={{ listStyle: 'inside' }}>
        {x.acf_fields.staging_links !== false
          ? x.acf_fields.staging_links.map((link) => (
              <li key={link.staging_link}>{link.staging_link}</li>
            ))
          : null}
      </ul>
    ),
    project_status: pType?.name,
    project_type: pStat?.name,
    start_date: x.acf_fields.start_date,
    deadline: x.acf_fields.end_date,
    project_tags: (
      <ul style={{ listStyle: 'inside' }}>
        {pTag.map((link) => (
          <li key={link.id}>{link.name}</li>
        ))}
      </ul>
    ),
    developers: (
      <ul style={{ listStyle: 'inside' }}>
        {developer.map((link) => (
          <li key={link.id}>{link.name}</li>
        ))}
      </ul>
    ),
    designers: (
      <ul style={{ listStyle: 'inside' }}>
        {designer.map((link) => (
          <li key={link.id}>{link.name}</li>
        ))}
      </ul>
    ),
    important_notes: parse(x.acf_fields.important_notes),
  }
}
