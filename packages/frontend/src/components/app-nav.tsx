import { Component, h, State, Listen } from '@stencil/core';


@Component({
    tag: 'app-nav'
})
export class AppNav {
    
    @State() expandNav = false;
    @State() theme = "";
    @State() showThemer = false;


    @Listen("selectTheme")
    onSelectTheme(e: {detail: string})
    {
        this.theme = e.detail;
    }

    @Listen("closeThemer")
    onCloseThemer()
    {  
        this.showThemer = false;
    }

    render() {
        return (
            <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="container">
                    <div class="navbar-brand">
                        <a class="navbar-item" href="/">
                            <img src="/assets/icon/icon.png" width="40" height="40" alt="logo"/>
                        </a>

                        <span role="button" class="navbar-burger burger" aria-label="menu" aria-expanded={this.expandNav} onClick={() => this.expandNav = !this.expandNav}>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span> 
                            <span aria-hidden="true"></span>
                        </span>
                    </div>
                    <div class={{
                        "navbar-menu": true,
                        "is-active": this.expandNav
                    }}>
                        <div class="navbar-start">
                            <stencil-route-link anchorClass="navbar-item" class="navbar-item" url='/' activeClass="is-active" exact={true}>
                                Home
                            </stencil-route-link>
                            <stencil-route-link anchorClass="navbar-item" class="navbar-item" url='/profile/stencil' activeClass="is-active">
                                Stencil
                            </stencil-route-link>
                        </div>
                        <div class="navbar-end">
                            <div class={{"navbar-item": true, "has-dropdown": true, "is-active": this.showThemer}}>
                                <a class="navbar-link" onClick={() => this.showThemer = true}>
                                    {this.theme}
                                </a>
                            </div>
                            <a class="navbar-item" href="https://github.com/IZEDx/kas-template">
                                <i class="fab fa-github"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <util-themer active={this.showThemer}></util-themer>
            </nav>
        );
    }
}
