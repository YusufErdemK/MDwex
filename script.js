const editor = document.getElementById('editor');
const preview = document.getElementById('preview');
const downloadBtn = document.getElementById('download-btn');

marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
    },
    langPrefix: 'hljs language-',
    pedantic: false,
    gfm: true, 
    breaks: true,
    sanitize: false,
    smartLists: true,
    smartypants: true,
    xhtml: false
});

const updatePreview = () => {
    const rawValue = editor.value;
    preview.innerHTML = marked.parse(rawValue);
};

editor.addEventListener('input', updatePreview);

downloadBtn.addEventListener('click', () => {
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="tr">
        <head>
            <meta charset="UTF-8">
            <title>MDwex - Export</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown.min.css">
            <style>
                body { box-sizing: border-box; min-width: 200px; max-width: 980px; margin: 0 auto; padding: 45px; }
                @media (max-width: 767px) { body { padding: 15px; } }
            </style>
        </head>
        <body class="markdown-body">
            ${preview.innerHTML}
        </body>
        </html>
    `;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mdwex-export-${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
});

updatePreview();