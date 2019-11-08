import { Component, h, State, Watch, Prop, Event, EventEmitter } from '@stencil/core';

interface Theme {
    name: string;
    css: string;
    thumb: string;
}

@Component({
    tag: "util-themer",
    styleUrl: "util-themer.scss"
})
export class UtilThemer {
    
    @Prop() active = false;
    @Prop() url = "https://jenil.github.io/bulmaswatch/api/themes.json";
    
    @State() themes: Theme[] = [];
    @State() selectedTheme = 0;
    @Event() selectTheme!: EventEmitter<string>;
    @Event() closeThemer!: EventEmitter<void>;

    themeEl = document.createElement("link");

    async componentWillLoad()
    {
        this.themes = (await (await fetch(this.url)).json()).themes;
        
        this.themeEl.setAttribute("rel", "stylesheet");
        this.themeEl.setAttribute("href", this.themes[0].css);
        document.head.appendChild(this.themeEl);

        if (localStorage.getItem("theme"))
        {
            this.selectedTheme = this.themes.findIndex(t => t.name === localStorage.getItem("theme"));
        }
        else 
        {
            this.selectedTheme = 0;
        }
    }

    get theme() {
        return this.themes[this.selectedTheme];
    }

    @Watch("selectedTheme")
    onSelectTheme()
    {
        if (this.selectedTheme < 0) this.selectedTheme = 0;
        if (this.selectedTheme >= this.themes.length) this.selectedTheme = this.themes.length - 1;

        console.log("Selected theme", this.theme.name);
        this.themeEl.setAttribute("href", this.theme.css);
        localStorage.setItem("theme", this.theme.name);
        this.selectTheme.emit(this.theme.name);
    }

    render() {
        return (
            <div class={{"modal": true, "is-active": this.active}}>
                <div class="modal-background" onClick={() => this.closeThemer.emit()}></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Themes</p>
                    </header>
                    <section class="modal-card-body">
                        <util-grid items={this.themes} map={(theme: Theme, i) => (
                            <a class="box" onClick={() => this.selectedTheme = i}>
                                <div class="theme-preview">
                                    <iframe src={theme.thumb}></iframe>
                                </div>
                                <br />
                                <div class="content has-text-centered">
                                    {theme.name}
                                </div>
                            </a>
                        )}></util-grid>
                    </section>
                    <footer class="modal-card-foot">
                        <a class="button" onClick={() => this.selectedTheme--}>
                            <i class="fas fa-angle-left"></i>
                        </a>
                        <label class="label">{this.theme.name}</label>
                        <a class="button" onClick={() => this.selectedTheme++}>
                            <i class="fas fa-angle-right"></i>
                        </a>
                    </footer>
                </div>
                <button class="modal-close is-large" aria-label="close" onClick={() => this.closeThemer.emit()}></button>
            </div>
        );
    }
}
