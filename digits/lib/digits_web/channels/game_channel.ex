defmodule DigitsWeb.GameChannel do
  use DigitsWeb, :channel

  @impl true
  def join("game:" <> _id, payload, socket) do
    IO.puts "veing called"
    if authorized?(payload) do
      game = Digits.Game.new()
      socket = assign(socket, :game, game)
      view = Digits.Game.view(game)
      {:ok, view, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  @impl true
  def handle_in("guess", ll, socket) do
    game0 = socket.assigns[:game]
    game1 = Digits.Game.guess(game0, ll)
    socket = assign(socket, :game, game1)
    view = Digits.Game.view(game1)
    {:reply, {:ok, view}, socket}
  end

  @impl true
  def handle_in("reset", re, socket) do
    game0 = socket.assigns[:game]
    game1 = Digits.Game.reset(game0)
    socket = assign(socket, :game, game1)
    view = Digits.Game.view(game1)
    {:reply, {:ok, view}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (game:lobby).
  # @impl true
  # def handle_in("shout", payload, socket) do
  #   broadcast socket, "shout", payload
  #   {:noreply, socket}
  # end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
