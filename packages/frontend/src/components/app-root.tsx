import { Component, h, Element } from '@stencil/core';
import axios, { TypedAxiosInstance } from 'restyped-axios';
import { APISchema, TypedClientSocket, SocketSchema } from "@kas/shared";
import { Provide } from 'stencil-quantum';
import io from "socket.io-client";

@Component({
 	tag: 'app-root'
})
export class AppRoot 
{
	@Element() el!: HTMLAppRootElement;
	@Provide() api!: TypedAxiosInstance<APISchema>;
	@Provide() socket!: TypedClientSocket<SocketSchema>;

	componentWillLoad()
	{
		this.api = axios.create<APISchema>({
			baseURL: "/api"
		});
		this.socket = io() as TypedClientSocket<SocketSchema>;
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
