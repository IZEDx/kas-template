import { Component, Prop, h, Element } from '@stencil/core';
import { MatchResults } from '@stencil/router';
import { Context, Get } from 'stencil-quantum';
import { TypedAxiosInstance } from 'restyped-axios';
import { APISchema } from '@kas/shared';

@Component({
  tag: 'app-profile'
})
export class AppProfile 
{
	@Prop() match: MatchResults;
	@Element() el!: HTMLAppHomeElement;

	@Context() api!: TypedAxiosInstance<APISchema>;
	@Get<APISchema>("api", "/") apiRoot = {msgFromShared: "initial message"};

	normalize(name: string): string 
	{
		if (name) {
			return name.substr(0, 1).toUpperCase() + name.substr(1).toLowerCase();
		}
		this.api.put("bla", )
		return ''; 
	}

	render() {
		if (this.match && this.match.params.name) {
			return [
				<section class="hero is-primary">
					<div class="hero-body">
						<div class="container">
							<h1 class="title">
								{this.apiRoot.msgFromShared}
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
								Hello! My name is {this.normalize(this.match.params.name)}. My name was passed in
								through a route param!
							</p>
						</div>
					</div>
				</section>
			];
		}
	}
}
