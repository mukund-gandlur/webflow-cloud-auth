// Use dynamic import to prevent SSR issues with localStorage
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let memberstackInstance: any = null

export async function getMemberstack() {
  if (typeof window === "undefined") {
    throw new Error("Memberstack can only be used on the client side")
  }

  const publicKey = process.env.NEXT_PUBLIC_MEMBERSTACK_PUBLIC_KEY
  if (!publicKey) {
    throw new Error("NEXT_PUBLIC_MEMBERSTACK_PUBLIC_KEY environment variable is not set")
  }

  if (!memberstackInstance) {
    const memberstackDOM = (await import("@memberstack/dom")).default
    memberstackInstance = memberstackDOM.init({
      publicKey,
    })
  }

  return memberstackInstance
}
