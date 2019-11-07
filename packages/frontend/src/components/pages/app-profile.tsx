import { Component, Prop, h, Element, State } from '@stencil/core';
import { MatchResults } from '@stencil/router';
import { Context } from 'stencil-quantum';
import { TypedAxiosInstance } from 'restyped-axios';
import { APISchema } from '@kas/shared';

@Component({
  tag: 'app-profile'
})
export class AppProfile {
	@Prop() match: MatchResults;
	@Element() el!: HTMLAppHomeElement;
	@Context() api!: TypedAxiosInstance<APISchema>;
	@State() message = "";

	async componentWillLoad()
	{
		this.message = (await this.api.get("/")).data.msgFromShared;
	}

	normalize(name: string): string {
		if (name) {
			return name.substr(0, 1).toUpperCase() + name.substr(1).toLowerCase();
		}
		return ''; 
	}

	render() {
		if (this.match && this.match.params.name) {
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
