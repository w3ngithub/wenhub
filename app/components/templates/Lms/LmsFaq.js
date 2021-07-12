import React from 'react'

function LmsFaq() {
  return (
    <div style={{ color: 'black' }}>
      <strong>
        Q. Total number of leave for probation completed Co-workers?
      </strong>
      <p>
        {' '}
        <strong>
          A. Company paid leaves are one day per month ({' '}
          <em>
            <strong>12 days</strong>
          </em>{' '}
          a year )
        </strong>
      </p>
      <strong>
        Q. When does the management resets the annual leave allocated to
        Co-workers?
      </strong>
      <p>
        <strong>
          A. At the beginning of new fiscal year usually after{' '}
          <span>15th July</span> of every year.
        </strong>
      </p>
      <strong>
        Q. How many days prior a leave needs to be applied in order to get
        approved?
      </strong>
      <p>
        <strong>
          A. Company reserves the right to approve/disapprove co-worker &apos;s
          leave:
          <span>
            <ul
              style={{
                listStyle: 'inside',
                marginLeft: '20px',
                marginTop: '10px',
              }}
            >
              <li>
                More than 2 days require prior information ( at least{' '}
                <strong>three days</strong> )
              </li>
              <li>
                Full day leave (s) requires informing at least
                <strong>two days prior</strong>
              </li>
              <li>
                Half day leave requires informing at least {' '}
                <strong>one day prior</strong>
              </li>
              <li>
                Short ( one-two hours ) break requires informing at least {' '}
                <strong>one day prior </strong>( to respective Lead or
                Management; except on emergencies )
              </li>
              <li>
                Less than 1 year Co-workers will have a incremental paid-leave (
                usable 1 leave per month )
              </li>
              <li>
                1+ year association are liable to 12 days in full ; at most{' '}
                <strong>three days</strong> can be used at once except on
                special occasions or unforeseen situations)
              </li>
            </ul>
          </span>
        </strong>
      </p>
      <strong>
        Q. What happens if my allocated Annual leave is nil, can I still take
        leave?
      </strong>
      <p>
        <strong>
          {' '}
          A. Yes, but once your leave count proceeds towards negative, your
          leave remuneration would return salary deduction based on the days
          exceeded.
        </strong>
      </p>
      <strong>
        Q. What is the formula or is there any calculations that we can be aware
        of in case of Leave renumeration?
      </strong>
      <p>
        <strong>
          {' '}
          A. Management will always try to be transparent to co-workers. Here's
          the simple formula:
          <p style={{ marginLeft: '40px', marginTop: '20px' }}>
            <em>
              <strong>
                {`{(Your Basic Salary)/(total no. of working days excluding Sat/Sun)} * (Leave discrepancy in days)`}
                 
              </strong>
            </em>
          </p>
        </strong>
      </p>
      <strong>Q. Can I re-apply for leave that got disapproved?</strong>
      <p>
        <strong>
          A. Yes you can, but it's always better to consult management.
        </strong>
      </p>
      <strong>
        Q. Can I adjust my leave after it got approved by Management?
      </strong>
      <p>
        <strong>A. Yes, but you would need to consult the management.</strong>
      </p>
      <strong>
        Q. Can I cancel my leave plan or make changes to the leave applied?
      </strong>
      <p>
        <strong>
          A. You can only make amendments to your leave application as long as
          it is not approved / disapproved by management or your leave date is 1
          day from today's date.
        </strong>
      </p>
      <strong>
        Q. What is company's policy for leave taken on Friday and Monday?
      </strong>
      <p>
        <strong>
          {' '}
          A. As per company's policy, leave taken from Friday to Monday is
          accrued to your leave count as <strong>4</strong> but since such rules
          can be made flexible from company to company according to government
          policy; management reserves the right to make such decisions based on
          the nature of leave.
        </strong>
      </p>
      <strong>
        Q. What time is usually allocated for First Half and Second Half?
      </strong>
      <p>
        <strong>
          A. Here are the time slots for Half Leaves. First Half 9 AM to 1:30 PM
          Second Half 1:30 PM to 6 PM
        </strong>
      </p>
      <em>
        <strong>To be Continued.....</strong>
      </em>
      &nbsp;
    </div>
  )
}

export default LmsFaq
