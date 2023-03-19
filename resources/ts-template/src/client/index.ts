setInterval(() => {
  const player = GetPlayerPed(-1);
  const pos = GetEntityCoords(player, true);

  const value: SharedType = {
    input: JSON.stringify(pos),
  };

  console.log(value);
}, 1000);
