import sfxr from "@/lib/jsfxr/sfxr";

const start_sound_1 =
  "11111AcTyGgajXPUacYcaT52cE6dh7dQdFjJkq6K3WW1vSQLxTDZ7yXgaJSsrT1Nvn3FsYD72VsNgkEjnxC7cHAqoKuaNb11sov6uh9KhQx33Qg5L8UJqxW3";

const start_sound_2 =
  "111118QKcQYh1XzJVfsv164j9o59Hd85LJh7zSqysArritAmDDckGTJeNfJAyVu1sfej5KMMR1JgY3t4GRUVdS255JikMs6vM5PHYxkoHdRRhWUh8N75daJb";

const start_sound_3 =
  "11111AcTyGgajXPUacYcaT52cE6dh7dQdFjJkq6K3WW1vSQLxTDZ7yXgaJSsrT1Nvn3FsYD72VsNgkEjnxC7cHAqoKuaNb11sov6uh9KhQx33Qg5L8UJqxW3";

const pick_coin_1 =
  "34T6PkvSF53sfEcNfbpS2R1vNbg2mgjD2T7wdvVxzhShHTRVcnRxuf7scAFoHQYvPwy4ypyAt1LaeXh1bzfgjarcEushJ1Xj7AbsGZ6wCovfVRAu25Qkyh6JK";

export const playStartSound = () => {
  const randomSound =
    Math.random() > 0.66
      ? start_sound_1
      : Math.random() > 0.33
      ? start_sound_2
      : start_sound_3;

  sfxr.toAudio(randomSound).play();
};

export const playPickCoinSound = () => {
  sfxr.toAudio(pick_coin_1).play();
};
