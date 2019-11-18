import { Component, h, Element } from '@stencil/core';
import axios from 'restyped-axios';
import { APISchema, TypedClientSocket, SocketSchema, SharedConfig, FrontendConfig } from "@kas/shared";
import { Provide, Get, log } from 'stencil-quantum';
import io from "socket.io-client";

log.debug = true;

@Component({
 	tag: 'app-root'
})
export class AppRoot 
{
	@Element() el!: HTMLAppRootElement;
	@Provide() api = axios.create<APISchema>({
		baseURL: "/api"
	});
	@Provide() socket = io() as TypedClientSocket<SocketSchema>;
	@Get<APISchema>("api", "/config") config!: SharedConfig & FrontendConfig;

	async componentDidLoad()
	{
		await new Promise(res => setTimeout(res, 500));
		console.log("From config:", this.config);
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
