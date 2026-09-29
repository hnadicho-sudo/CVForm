$file = 'd:\My Profile\index.html'
$content = Get-Content -Raw $file
$pattern = '(?s)<a href="viber://chat\?number=\+959259508607" class="social-link" aria-label="Contact via Viber">.*?</a>'
$replace = @'
<a href="viber://chat?number=+959259508607" class="social-link" aria-label="Contact via Viber">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5A9.5 9.5 0 0 0 2.5 12a9.5 9.5 0 0 0 1.7 5.5L3 21l3.8-1.2a9.5 9.5 0 0 0 8.8 0 9.5 9.5 0 0 0 4.9-8.3A9.5 9.5 0 0 0 12 2.5Zm-1.5 5.6c.4-.4 1-.5 1.4-.2l.8.7c.4.3.5.9.2 1.3l-.8 1.1c-.2.3-.2.7 0 1l1 1.5c.3.4.8.5 1.3.3l1.2-.6c.4-.2.9-.1 1.2.2.3.3.5.8.4 1.2-.3 1.6-1.8 2.7-3.3 2.8h-.1c-1.6 0-3.1-.6-4.3-1.8l-.1-.2C7.6 14.8 7 13.4 7 12c0-1.5 1.1-2.9 2.7-3.2.4-.1.8.1 1.1.4l.7.9Zm5.5 3.1c-.2-.4-.7-.6-1.1-.4l-.8.5c-.3.2-.7.1-.9-.2-.5-.5-1.1-1-1.7-1.4-.3-.2-.7-.2-1-.1l-.7.3c-.4.2-.8.1-1-.2-.3-.3-.5-.7-.6-1.1-.2-.7.1-1.5.8-1.8l.9-.4c.6-.2 1.4.1 1.8.6l1 1.4c.4.7.4 1.5-.2 2.1l-.8.8Z"/></svg>
                Viber
              </a>
'@
if ($content -match $pattern) {
    $newContent = [regex]::Replace($content, $pattern, $replace, 1)
    Set-Content -Path $file -Value $newContent -Encoding UTF8
    Write-Host 'Updated viber social icon.'
} else {
    Write-Host 'No match found.'
}
