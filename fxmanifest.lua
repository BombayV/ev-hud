fx_version 'cerulean'

game 'gta5'

version '1.0.0'

description 'Standalone hud created by a Entity Evolution'

lua54 'yes'

client_scripts {
	'config/config_cl.lua',
	'client/hud_cl.lua'
}

server_scripts {
	"@vrp/lib/utils.lua",
	'hud_sv.lua'
}

ui_page 'html/ui.html'

files {
	'html/ui.html',
	'html/css/*.css',
	'html/fonts/*.ttf',
	'config/config.js',
	'html/js/*.js',
	'html/img/noti.wav',
	'html/img/*.png',
	'html/img/logos/*.png'
}
