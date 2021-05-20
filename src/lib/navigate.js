export default function navigate(url) {
  // if (document) {
  //   const a = document.createElement('a')
  //   a.setAttribute('rel', 'noopener noreferrer')
  //   a.setAttribute('target', '_blank')
  //   a.href = url
  //   a.click()
  // }
  window?.open(url, '_blank')
}
