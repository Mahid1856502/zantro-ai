## Summary

An early release of PHP, the PHP 8.1.0-dev version was released with a backdoor on March 28th 2021, but the backdoor was quickly discovered and removed. If this version of PHP runs on a server, an attacker can execute arbitrary code by sending the User-Agentt header. ![](https://flast101.github.io/php-8.1.0-dev-backdoor-rce/php-repo.png)

## Exploit

This short exploit script \`backdoor_php_8.1.0-dev.py\` uses the backdoor to provide a pseudo system shell on the host.

## Usage

\`\`\`sh
python3 backdoor_php_8.1.0-dev.py
\`\`\`

![](https://flast101.github.io/php-8.1.0-dev-backdoor-rce/revshell-script.png)

> Be Curious, Learning is Life
