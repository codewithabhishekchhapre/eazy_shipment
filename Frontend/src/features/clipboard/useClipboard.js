import toast from 'react-hot-toast'

export function useClipboard() {
  async function copyText(text) {
    if (!text) return false
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Copied to clipboard')
      return true
    } catch {
      toast.error('Could not copy to clipboard')
      return false
    }
  }

  async function pasteText() {
    try {
      const text = await navigator.clipboard.readText()
      toast.success('Pasted from clipboard')
      return text
    } catch {
      toast.error('Could not read clipboard — check browser permissions')
      return ''
    }
  }

  return { copyText, pasteText }
}
