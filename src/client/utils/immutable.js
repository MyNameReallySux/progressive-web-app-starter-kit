export function updateObject(obj, updated){
	return Object.assign({}, obj, updated)
}

export function updateArrayItem(array, id, callback){
	const updatedItems = array.map(item => {
		if(item.id !== id){
			return item
		}
		
		const updatedItem = callback(item)
		return updatedItem
	})
	return updatedItems
}

export function updateArray(array, updated){
	var temp = {}
		
	array.forEach(value => {
		temp[value.id] = value
	})
	updated.forEach(value => {
		temp[value.id] = value
	})
	
    var result = []
    
    Object.entries(temp).forEach(([property, value]) => {
        if(temp.hasOwnProperty(property) && property !== undefined){
			result.push(temp[property])
		}
    })

	return result
}