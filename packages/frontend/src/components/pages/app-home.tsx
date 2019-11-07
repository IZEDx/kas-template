import { Component, h, Element, State } from '@stencil/core';
import { Context } from 'stencil-quantum';
import { TypedAxiosInstance } from 'restyped-axios';
import { APISchema } from '@kas/shared';

@Component({
  	tag: 'app-home'
})
export class AppHome 
{

	@Element() el!: HTMLAppHomeElement;
	@Context() api!: TypedAxiosInstance<APISchema>;
	@State() message = "";

	async componentWillLoad()
	{
		this.message = (await this.api.get("/")).data.msgFromShared;
	}

	render() {
		return [
			<section class="hero is-primary">
				<div class="hero-body">
					<div class="container">
						<h1 class="title">
							{this.message}
						</h1>
						<h2 class="subtitle">
							Message from API
						</h2>
					</div>
				</div>
			</section>,
			<section class="section">
				<div class="container">
					<div class="content">
						<p>
							Welcome to the Stencil App Starter.
							You can use this starter to build entire apps all with
							web components using Stencil!
							Check out our docs on <a href='https://stenciljs.com'>stenciljs.com</a> to get started.
						</p>

						<stencil-route-link url='/profile/stencil'>
						<button>
							Profile page
						</button>
						</stencil-route-link> 
					</div>
				</div>
			</section>
		];
	}
}
