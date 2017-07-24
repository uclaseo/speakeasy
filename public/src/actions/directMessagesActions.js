export const RECENT_DIRECT_MESSAGES = 'RECENT_DIRECT_MESSAGES'
export const NEW_DIRECT_MESSAGE = 'NEW_DIRECT_MESSAGE'
export const CLEAR_DIRECT_MESSAGES = 'CLEAR_DIRECT_MESSAGES'

export function recentDirectMessages(messages) {
  let recentMessages = messages.reverse()
  return {
    type: RECENT_DIRECT_MESSAGES,
    payload: recentMessages
  }
}

export function newDirectMessage(message) {
  return {
    type: NEW_DIRECT_MESSAGE,
    payload: message
  }
}

export function clearDirectMessages() {
  return {
    type: CLEAR_DIRECT_MESSAGES,
    payload: []
  }
}