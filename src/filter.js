export let formatPublishTime = (value)=>{
  let timestamp = new Date() - new Date(value);

  let year = Math.floor(timestamp / (1000*60*60*24*365));
  let month = Math.floor(timestamp / (1000*60*60*24*30));
  let day = Math.floor(timestamp / (1000*60*60*24));
  let hour = Math.floor(timestamp / (1000*60*60));
  let minutes = Math.floor(timestamp / (1000*60));
  let seconds = Math.floor(timestamp / (1000));

  if (year) return `${year} 年前`

  if (month) return `${month} 月前`

  if (day) return `${day} 天前`

  if (hour) return `${hour} 小时前`

  if (minutes) return `${minutes} 分钟前`

  if (seconds) return `${seconds} 秒前`

  return '刚刚';
}