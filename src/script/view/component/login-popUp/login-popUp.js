import html from "./login.html";
import css from "./style.css";
import componentTemplateFactory from "../../../utils/componentTemplateFactory.js";

const template = componentTemplateFactory(html,css);

class LoginPopUp extends HTMLElement {

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = template;
    }
}

customElements.define("login-popup",LoginPopUp);