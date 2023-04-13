import apiRequest from "@/utils/http.js"

export const fetchCode = (query) => {
	return apiRequest({
		url: 'qrcode/content',
		method: 'post',
		data: {
			...query
		}
	})
}

export const codeLogin = (query) => {
	return apiRequest({
		url: 'qrcode/login',
		method: 'post',
		data: {
			...query
		}
	})
}

export const fetchCodeStatus = (query) => {
	return apiRequest({
		url: 'qrcode/status',
		method: 'post',
		data: {
			...query
		}
	})
}
// 发送弹幕
export const sendBullet = (query) => {
	return apiRequest({
		url: 'bullet_screen/post_comment',
		method: 'post',
		data: {
			...query
		}
	})
}
// 获取弹幕列表
export const bulletList = (query) => {
	return apiRequest({
		url: 'bullet_screen/comments',
		method: 'post',
		data: {
			...query
		}
	})
}
// 获取消费列表
export const bulletProductList = (query) => {
	return apiRequest({
		url: 'bullet_screen/product/admin/list',
		method: 'post',
		data: {
			...query
		}
	})
}

// 获取策略详情
export const projectList = (query) => {
	return apiRequest({
		url: 'shop/my_benefit',
		method: 'post',
		data: {
			...query
		}
	})
}

export const getAllNft = (query) => {
	return apiRequest({
		url: 'wallet/user/all/nft/list',
		method: 'post',
		data: {
			...query
		}
	})
}

export const getUserDetail = (query) => {
	return apiRequest({
		url: 'user/detail',
		method: 'post',
		data: {
			...query
		}
	})
}

// 获取屏幕详情
export const screenDeatil = (query) => {
	return apiRequest({
		url: 'bullet_screen/detail',
		method: 'post',
		data: {
			...query
		}
	})
}
// 获取超级弹幕详情
export const productDetail = (query) => {
	return apiRequest({
		url: 'bullet_screen/product/detail',
		method: 'post',
		data: {
			...query
		}
	})
}