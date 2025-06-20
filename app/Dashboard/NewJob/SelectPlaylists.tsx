import { useEffect, useState } from "react";

interface Playlist {
  name: string;
  tracks: string;
  owner: {
    display_name: string;
    id: string;
  };
  number_of_tracks: number;
  image_uri: string;
}

interface Props {
  service: string;
}

export const SelectPlaylists = ({ service }: Props) => {
  const [response, setResponse] = useState<Playlist[]>([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState<Set<string>>(
    new Set(),
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!service) {
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("auth_token");
    fetch(`https://handoff-api.enns.dev/api/playlists?service=${service}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (r) => {
        const data = (await r.json()).playlists;
        setResponse(data);
      })
      .catch((error) => {
        console.error("Error fetching playlists:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [service]);

  const togglePlaylist = (playlistName: string) => {
    const newSelected = new Set(selectedPlaylists);
    if (newSelected.has(playlistName)) {
      newSelected.delete(playlistName);
    } else {
      newSelected.add(playlistName);
    }
    setSelectedPlaylists(newSelected);
  };

  const selectAll = () => {
    if (selectedPlaylists.size === response.length) {
      setSelectedPlaylists(new Set());
    } else {
      setSelectedPlaylists(new Set(response.map((p) => p.name)));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/20 border-t-white"></div>
        <span className="ml-4 text-white text-lg">Loading playlists...</span>
      </div>
    );
  }

  if (!response || response.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-white/70 text-lg">
          {service
            ? `No playlists found for ${service}`
            : "Select a service to view playlists"}
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          Select Playlists from{" "}
          {service.charAt(0).toUpperCase() + service.slice(1)}
        </h2>
        <button
          onClick={selectAll}
          className="px-4 py-2 rounded-xl font-medium transition-all duration-300 text-white/70 bg-white/10 hover:text-white hover:bg-white/20"
        >
          {selectedPlaylists.size === response.length
            ? "Deselect All"
            : "Select All"}
        </button>
      </div>

      <div className="mb-6 p-4 bg-white/5 rounded-2xl border border-white/10">
        <div className="text-white/90 text-sm font-medium">
          {selectedPlaylists.size} playlist
          {selectedPlaylists.size !== 1 ? "s" : ""} selected
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
        {response.map((playlist) => (
          <div
            key={playlist.name}
            onClick={() => togglePlaylist(playlist.name)}
            className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer hover:transform hover:-translate-y-1 ${
              selectedPlaylists.has(playlist.name)
                ? "bg-white/20 border-white/40 shadow-lg"
                : "bg-white/5 border-white/10 hover:bg-white/10"
            }`}
          >
            <div className="flex items-start space-x-4">
              {/* Playlist Image */}
              <div className="flex-shrink-0">
                {playlist.image_uri ? (
                  <img
                    src={playlist.image_uri}
                    alt={playlist.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-400/20 to-pink-400/20 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white/60"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 12c0-1.53-.43-2.950-1.172-4.172a1 1 0 010-1.485z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Playlist Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-sm truncate mb-1">
                  {playlist.name}
                </h3>
                <p className="text-white/60 text-xs mb-2">
                  by {playlist.owner.display_name}
                </p>
                <div className="flex items-center text-white/50 text-xs">
                  <span>{playlist.number_of_tracks} tracks</span>
                </div>
              </div>

              {/* Selection Indicator */}
              <div className="flex-shrink-0">
                <div
                  className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                    selectedPlaylists.has(playlist.name)
                      ? "bg-gradient-to-r from-green-400 to-cyan-400 border-transparent"
                      : "border-white/30"
                  }`}
                >
                  {selectedPlaylists.has(playlist.name) && (
                    <svg
                      className="w-3 h-3 text-white m-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-white/10">
        <button className="w-full py-3 px-6 bg-gradient-to-r from-green-400 to-cyan-400 text-white font-semibold rounded-2xl hover:from-green-500 hover:to-cyan-500 transition-all duration-300 hover:transform hover:-translate-y-0.5 hover:shadow-lg">
          Transfer {selectedPlaylists.size} Playlist
          {selectedPlaylists.size !== 1 ? "s" : ""}
        </button>
      </div>
    </div>
  );
};
