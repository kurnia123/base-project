const componentTemplateFactory = (html, css) => {
    let template = `
        <style>
            ${css}
        </style>
        ${html}
    `;
    return template;
};

export default componentTemplateFactory;