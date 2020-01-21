import Storage from './storage'

const Utilities = {}

// sessionName is the incoming query parameter from any link service
const sessionName = 'tncpw_session'

// setOreo for creating new oreos
Utilities.setOreo = (name, value, days) => {
  let d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days)
  document.cookie = name + '=' + value + ';path=/;expires=' + d.toGMTString()
}

// captureVisitorSession will capture the session and store it
// Builds a cookie so it's sent on requests automatically
// Stores in local storage for easy access from the application
Utilities.captureVisitorSession = (customSessionId = '') => {
  let sessionId = customSessionId
  if ((!customSessionId || customSessionId.length === 0) && typeof window !== 'undefined') {
    let urlParams = new URLSearchParams(window.location.search)
    sessionId = urlParams.get(sessionName)
  }
  if (sessionId && sessionId.length > 0) {
    this.setOreo(sessionName, sessionId, 60)
    Storage.setStorage(sessionName, sessionId, (24 * 60 * 60 * 60)) // default is 60 days
  }
}

export default Utilities
