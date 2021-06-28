import React from 'react'
import PropTypes from 'prop-types'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
function CalendarComponent({
  localizer,
  events,
  startAccessor,
  endAccessor,
  titleAccessor,
  tooltipAccessor,
  allDayAccessor,
  resourceAccessor,
  resourceIdAccessor,
  resourceTitleAccessor,
  resources,
  style,
  view,
  getNow,
  onNavigate,
  onView,
  onDrillDown,
  length,
  toolbar,
  popup,
  popupOffset,
  formats,
  components,
  dayPropGetter,
  slotPropGetter,
  eventPropGetter,
}) {
  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor={startAccessor}
      endAccessor={endAccessor}
      titleAccessor={titleAccessor}
      tooltipAccessor={tooltipAccessor}
      allDayAccessor={allDayAccessor}
      resourceAccessor={resourceAccessor}
      resources={resources}
      resourceIdAccessor={resourceIdAccessor}
      resourceTitleAccessor={resourceTitleAccessor}
      style={style}
      view={view}
      getNow={getNow}
      onNavigate={onNavigate}
      onView={onView}
      onDrillDown={onDrillDown}
      length={length}
      toolbar={toolbar}
      popup={popup}
      popupOffset={popupOffset}
      formats={formats}
      components={components}
      dayPropGetter={dayPropGetter}
      slotPropGetter={slotPropGetter}
      eventPropGetter={eventPropGetter}
    />
  )
}

CalendarComponent.propTypes = {
  localizer: PropTypes.object,
  events: PropTypes.arrayOf(PropTypes.object),
  startAccessor: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  endAccessor: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  titleAccessor: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  tooltipAccessor: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  allDayAccessor: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  resourceAccessor: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  resourceIdAccessor: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  resourceTitleAccessor: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),
  resources: PropTypes.array,
  style: PropTypes.object,
  view: PropTypes.string,
  getNow: PropTypes.func,
  onNavigate: PropTypes.func,
  onView: PropTypes.func,
  onDrillDown: PropTypes.func,
  length: PropTypes.number,
  toolbar: PropTypes.bool,
  popup: PropTypes.bool,
  popupOffset: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  dayPropGetter: PropTypes.func,
  slotPropGetter: PropTypes.func,
  eventPropGetter: PropTypes.func,
}

CalendarComponent.defaultProps = {
  localizer: momentLocalizer(moment),
  events: [],
  startAccessor: 'start',
  endAccessor: 'end',
  titleAccessor: 'title',
  tooltipAccessor: 'title',
  allDayAccessor: 'allDay',
  resourceAccessor: 'resourceId',
  resourceIdAccessor: 'id',
  resourceTitleAccessor: 'title',
  style: {},
  getNow: () => new Date(),
  onNavigate: () => {},
  onDrillDown: () => {},
  onView: () => {},
  length: 30,
  toolbar: true,
  popup: true,
  dayPropGetter: () => {},
  slotPropGetter: () => {},
  eventPropGetter: () => {},
}

export default CalendarComponent
