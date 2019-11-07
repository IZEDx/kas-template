import { Component, h, Element } from '@stencil/core';
import axios, { TypedAxiosInstance } from 'restyped-axios';
import { APISchema } from "@kas/shared";
import { Provide } from 'stencil-quantum';

@Component({
 	tag: 'app-root'
})
export class AppRoot 
{
	@Element() el!: HTMLAppRootElement;
	@Provide() api!: TypedAxiosInstance<APISchema>;

	componentWillLoad()
	{
		this.api = axios.create<APISchema>({
			baseURL: "/api"
		});
	}


	render() 
	{
		return (
			<div>
				<app-nav></app-nav>
				<main>
					<stencil-router>
						<stencil-route-switch scrollTopOffset={0}>
							<stencil-route url='/' component='app-home' exact={true} />
							<stencil-route url='/profile/:name' component='app-profile' />
						</stencil-route-switch>
					</stencil-router>
				</main>
			</div>
		);
	}
}
