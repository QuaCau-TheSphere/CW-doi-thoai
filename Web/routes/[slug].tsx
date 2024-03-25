import { Handlers, PageProps } from "$fresh/server.ts"

// interface Data {
//   url: string
// } 
export const handler = {
	GET(req, ctx) {
		const url = req.url
		return ctx.render({ url })
	},
}

export default function Home({ data }) {
	return (
		<div>
			{data.url} 
		</div>
	)
}