local Tunnel = module('vrp','lib/Tunnel')
local Proxy = module('vrp','lib/Proxy')
vRP = Proxy.getInterface('vRP')

RegisterNetEvent('ev:getServerInfo', function()
	local source = {source}
	local playerID = vRP.getUserId(source)
	local player = vRP.getUserSource({playerID})

	local info = {
		hunger = math.ceil(100 - vRP.getHunger({playerID}),
		thirst = math.ceil(100 - vRP.getThirst({playerID}),

		job = vRP.getUserGroupByType({playerID, 'job'}),

		money = vRP.getMoney({playerID}),
		bankMoney = vRP.getBankMoney({playerID}),
		blackMoney = vRP.getInventoryItemAmount({playerID, 'black_money'}),
        players = #GetPlayers()
	}
	TriggerClientEvent('ev:setInfo', player, info) 
end)
