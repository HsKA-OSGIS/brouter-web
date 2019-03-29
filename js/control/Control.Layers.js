BR.ControlLayers = L.Control.Layers.extend({

    getActiveLayers: function () {
        var result = [];

		for (var i = 0; i < this._layers.length; i++) {
            var obj = this._layers[i];
            if (this._map.hasLayer(obj.layer)) {
                if (obj.overlay) {
                    result.push(obj);
                } else {
                    result.unshift(obj);
                }
            }
        }

        return result;
    },

    removeActiveLayers: function () {
        var removed = [];

		for (var i = 0; i < this._layers.length; i++) {
            var obj = this._layers[i];
            if (this._map.hasLayer(obj.layer)) {
                this._map.removeLayer(obj.layer);
                removed.push(obj);
            }
        }

        return removed;
    },

    getLayer: function (name) {
        for (var i = 0; i < this._layers.length; i++) {
			if (this._layers[i] && this._layers[i].name === name) {
				return this._layers[i];
			}
		}
    },

    activateLayer: function (name) {
        var obj = this.getLayer(name);
        if (obj) {
            this._map.addLayer(obj.layer);
        }
        return obj;
    },

    activateFirstLayer: function () {
        for (var i = 0; i < this._layers.length; i++) {
            var obj = this._layers[i];
            if (!obj.overlay) {
                this._map.addLayer(obj.layer);
                break;
            }
        }
    }

});