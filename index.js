RUN(() => {
	
	let langStore = STORE('langStore');
	
	let browserLang = MSG({
		en : 'en',
		ko : 'ko',
		'zh-TW' : 'zh-TW',
		'zh-CN' : 'zh-CN'
	});
	
	let changePageByLang = (lang) => {
		
		if (pageLang !== lang) {
			
			if (lang === 'en') {
				location.href = 'index.html';
			}
			
			if (lang === 'ko') {
				location.href = 'index-kr.html';
			}
			
			if (lang === 'zh-TW') {
				location.href = 'index-zh-tw.html';
			}
			
			if (lang === 'zh-CN') {
				location.href = 'index-zh-cn.html';
			}
		}
	};
	
	let changeLangSelect = SELECT({
		style : {
			position : 'absolute',
			right : 10,
			top : 10,
			backgroundColor : '#1e1e1e',
			color : '#666',
			padding : '5px 8px',
			border : 'none'
		},
		c : [OPTION({
			value : 'en',
			c : 'English'
		}), OPTION({
			value : 'ko',
			c : '한국어'
		}), OPTION({
			value : 'zh-TW',
			c : '繁體中文'
		}), OPTION({
			value : 'zh-CN',
			c : '简体中文'
		})],
		value : pageLang,
		on : {
			change : (e, select) => {
				
				if (select.getValue() === 'en') {
					langStore.save({
						name : 'isToEnglishPage',
						value : true
					});
				} else {
					langStore.save({
						name : 'isToEnglishPage',
						value : false
					});
				}
				
				changePageByLang(select.getValue());
			}
		}
	}).appendTo(BODY);
	
	if (
	(pageLang === 'en' && langStore.get('isToEnglishPage') !== true) ||
	langStore.get('lang') === undefined) {
		
		langStore.save({
			name : 'lang',
			value : browserLang
		});
		
		changePageByLang(browserLang);
	}
});