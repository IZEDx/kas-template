import { Component, h, State } from '@stencil/core';


@Component({
    tag: 'app-nav'
})
export class AppNav {
    @State() expandNav = false;

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
                            <stencil-route-link class="navbar-item" url='/'>
                                Home
                            </stencil-route-link>
                            <stencil-route-link class="navbar-item" url='/profile/stencil'>
                                Stencil
                            </stencil-route-link>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}
