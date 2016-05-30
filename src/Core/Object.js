WHS.Object = class {
	constructor( defaults = {}, structurable = true ) {

		var scope = structurable
		? Object.assign( this,
		{
			__whsobject: true,
			__releaseTime: new Date().getTime(),
			__params: {},
			__defaults: defaults,

			parent: null,
			children: []
		},
		new Events())
		: Object.assign( this,
		{
			__whsobject: true,
			__releaseTime: new Date().getTime(),
			__params: {}
		},
		new Events());

		return scope;
	}

	setParams( params = {} ) {

		this.__params = WHS.API.extend( params, this.__defaults );

	}

	updateParams( params = {} ) {

		this.__params = WHS.API.extend( params, this.__params );

	}

	getParams() {

		return this.__params;

	}

	add( children ) {

		let _scope = this;

		if ( children instanceof WHS.Shape || children instanceof WHS.Light )
			return children.addTo( this );
		else if ( children instanceof WHS.Object ) {

			return new Promise((resolve, reject) => {

				children.parent = _scope;

				_scope.getNative().add( children.getNative() );

				_scope.children.push( _scope );

				resolve();

			});

		}

	}

}
