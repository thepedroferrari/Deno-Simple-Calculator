# Simple calculator in Deno
This program launches a web server at port 8080 and expects a query param `calc`
to contain a valid arithmetic string.

The program is only set to resolve sum, sub and multiplications (+ / - / *)
the server will launch at http://localhost:8080.

To run this program you must have Deno installed. https://deno.land/manual/getting_started/installation

## Installation

Deno works on macOS, Linux, and Windows. Deno is a single binary executable. It
has no external dependencies.

On macOS, both M1 (arm64) and Intel (x64) executables are provided. On Linux and
Windows, only x64 is supported.

### Download and install

[deno_install](https://github.com/denoland/deno_install) provides convenience
scripts to download and install the binary.

Using Shell (macOS and Linux):

```shell
curl -fsSL https://deno.land/x/install/install.sh | sh
```

Using PowerShell (Windows):

```shell
iwr https://deno.land/x/install/install.ps1 -useb | iex
```

Using [Scoop](https://scoop.sh/) (Windows):

```shell
scoop install deno
```

Using [Chocolatey](https://chocolatey.org/packages/deno) (Windows):

```shell
choco install deno
```

Using [Homebrew](https://formulae.brew.sh/formula/deno) (macOS):

```shell
brew install deno
```

Using [Nix](https://nixos.org/download.html) (macOS and Linux):

```shell
nix-shell -p deno
```

Build and install from source using [Cargo](https://crates.io/crates/deno):

```shell
cargo install deno --locked
```

Deno binaries can also be installed manually, by downloading a zip file at
[github.com/denoland/deno/releases](https://github.com/denoland/deno/releases).
These packages contain just a single executable file. You will have to set the
executable bit on macOS and Linux.

### Run the program
After Deno is successfully installed, you can run the program by typing
`deno run --allow-net  webserver.ts` at the root directory.
 