import moment from 'moment'

type diffData = {
  days: number;
  hours: number;
  minutes: number;
}

export const dateHandler = {
  getPostTime: (datePost: Date) => {
    const post = moment(new Date(datePost))
    const current = moment(new Date())
    return {
      days: current.diff(post, 'days'),
      hours: current.diff(post, 'hours'),
      minutes: current.diff(post, 'minutes')
    }
  },
  getTextTime: (diffValues: diffData) => {
    console.log('diff', diffValues)
    if (diffValues.minutes <= 1) { return 'Justo ahora' }
    if (diffValues.minutes > 1 && diffValues.minutes < 60) { return 'Hace ' + diffValues.minutes + ' minutos' }
    if (diffValues.hours >= 1 && diffValues.hours < 24) { return 'Hace ' + diffValues.hours + ' horas' }
    if (diffValues.days >= 1) { return 'Hace ' + diffValues.days + ' dias' }
  }
}
