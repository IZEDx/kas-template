import { Component, h, Element } from '@stencil/core';
import { Context, Receive } from 'stencil-quantum';
import { TypedAxiosInstance } from 'restyped-axios';
import { APISchema, TypedClientSocket, SocketSchema } from '@kas/shared';

@Component({
  	tag: 'app-home'
})
export class AppHome 
{

	@Element() el!: HTMLAppHomeElement;

	@Context() api!: TypedAxiosInstance<APISchema>;
	@Context() socket!: TypedClientSocket<SocketSchema>;
	@Receive<TypedClientSocket<SocketSchema>>("socket") count = 0;

	render() {
		return [
			<section class="hero is-primary">
				<div class="hero-body">
					<div class="container">
						<h1 class="title">
							kas-template {this.count}
						</h1>
						<h2 class="subtitle">
							Koa + Axios + Stencil ( + Bulma )
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
							<button class="button is-primary">
								Profile page
							</button>
						</stencil-route-link> 
					</div>
				</div>
			</section>
		];
	}
}
