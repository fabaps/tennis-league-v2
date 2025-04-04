export async function shareLink(url: string): Promise<void> {
    if (navigator.share) {
      await navigator.share({ url });
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(url);
    } else {
      throw new Error("Sharing is not supported on this device");
    }
  }