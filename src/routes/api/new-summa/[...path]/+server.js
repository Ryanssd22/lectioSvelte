import summa from '$lib/data/summa.json';

export const GET = ({ params }) => {

    if( !params.path ) {
	return new Response(JSON.stringify(summa),  {
	    headers: {'Content-Type': 'application/json'}
	});
    }

    const parts = params.path.split('/') ;
    let section = summa;

    for (const p of parts) {
	if(section && p in section) {
	    section = section[p];
	} else {
	    return new Response( 
		JSON.stringify({ error: `Path '${params.path}' not found`}), 
		{ status: 404, headers: {'Content-Type': 'application/json'} }
	    );
	}
    }

    return new Response(JSON.stringify(section), {
	headers: { 'Content-Type': 'application/json'}
    })
};
