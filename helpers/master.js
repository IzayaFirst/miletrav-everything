const day = [
  {
    day: 0,
    dayName: 'Monday',
  },
  {
    day: 1,
    dayName: 'Tuesday',
  },
  {
    day: 2,
    dayName: 'Wednesday',
  },
  {
    day: 3,
    dayName: 'Thursday',
  },
  {
    day: 4,
    dayName: 'Friday',
  },
  {
    day: 5,
    dayName: 'Saturday',
  },
  {
    day: 6,
    dayName: 'Sunday',
  },
]

export const getDay = (id) => {
  return day.find((days) => {
    return days.day === id
  }).dayName
}

export const time = ['08.00', '08.30', '09.00', '09.30', '10.00', '10.30', '11.00', '11.30', '12.00', '12.30',
  '13.00', '13.30', '14.00', '14.30', '15.00', '15.30', '16.00', '16.30', '17.00', '17.30', '18.00', '18.30', '19.00',
  '19.30', '20.00', '20.30', '21.00', '21.30', '22.00', '22.30'];
export const etime = ['08.00', '08.30', '09.00', '09.30', '10.00', '10.30', '11.00', '11.30', '12.00', '12.30',
  '13.00', '13.30', '14.00', '14.30', '15.00', '15.30', '16.00', '16.30', '17.00', '17.30', '18.00', '18.30', '19.00',
  '19.30', '20.00', '20.30', '21.00', '21.30', '22.00', '22.30', '23.00'];

export default day