import { Input } from 'antd'

export function setFilterOptions(x) {
  return {
    label: `${x.name}(${x.count})`,
    value: x.id,
  }
}

export function getDataDetail(x) {
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
    project_status: 'On Going', // x._embedded['wp:term'][2][0]?.name,
    project_type: 'Custom Build', // x._embedded['wp:term'][1][0]?.name,
    start_date: x.acf_fields.start_date,
    deadline: x.acf_fields.end_date,
    important_notes: (
      <div
        dangerouslySetInnerHTML={{ __html: x.acf_fields.important_notes }}
      ></div>
    ),
  }
}
