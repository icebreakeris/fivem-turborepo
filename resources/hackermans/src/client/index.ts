setInterval(() => {
  const entities = [...GetGamePool('CVehicle'), ...GetGamePool('CPed')];

  const allPos = entities
    .map((ped) => {
      const playerPed = GetPlayerPed(-1);

      if (ped === playerPed) {
        return;
      }

      const coords = GetEntityCoords(ped, true);

      const [retval, screenX, screenY] = GetScreenCoordFromWorldCoord(coords[0], coords[1], coords[2]);

      if (!retval) {
        return;
      }

      const camCoords = GetGameplayCamCoords();
      const distance = Vdist2(coords[0], coords[1], coords[2], camCoords[0], camCoords[1], camCoords[2]);
      const fov = GetGameplayCamFov();
      const textScale = (1 / distance) * 2 * ((1 / fov) * 100) * 50;

      const data: PedPosData = {
        entity: ped,
        x: screenX,
        y: screenY,
        scale: textScale,
      };

      return data;
    })
    .filter((val) => val);

  SendNuiMessage(
    JSON.stringify({
      type: 'position:allpos',
      data: allPos,
    })
  );
}, 10);

RegisterNuiCallback('deleteEntity', (data: { entity: number }, cb: (data: unknown) => undefined) => {
  const entity = data.entity;

  DeleteEntity(entity);

  cb({ item: 'ok' });
});

RegisterCommand(
  'nui',
  (source: number, args: string[]) => {
    const value = args[0] === 'true';

    SetNuiFocus(value, value);
  },
  false
);
