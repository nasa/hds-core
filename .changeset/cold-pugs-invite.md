---
'@nasa-hds/core': patch
---

Releases now publish a SHA-256 checksum for the dist zip. Each GitHub Release carries a `hds-core-vX.Y.Z-dist.zip.sha256` asset alongside the zip, and the same digest is printed in the release notes under "Verify your download". Adopters who self-host the zip instead of installing from npm can now verify the download; the No-Build Environments guide documents how.
