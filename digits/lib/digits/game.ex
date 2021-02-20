defmodule Digits.Game do
  def new do
    %{
      secret: rand_secret(),
      guesses: [],
      hints: [],
      guess: "",
      isWin: false,
    }
  end

# if the guess is not a valid guess it will clear the current guess
  def guess(st, attempt) do
    if good_guess(attempt) do
      %{st | guesses: st.guesses++[attempt],
    hints: st.hints++[get_hint(st.secret, attempt, 1, 0, 0)],
    isWin: is_win(attempt, st.secret)}
  else
    %{st | guess: ""}
  end

  end

  def updateGuess(st, text) do
    %{st | guess: text}
  end

  def reset(st) do
    %{st | secret: rand_secret(),
      guesses: MapSet.new,
      hints: Mapset.new,
      guess: MapSet.new
  }
  end

  def view(st) do
  #   guess = st.guess
  #   |> String.graphemes
  #   |> Enum.map(fn xx -> xx
  # end)
  #   |> Enum.join("")
  #
  #   %{
  #     guess: guess,
  #     guesses: MapSet.to_list(st.guesses),
  #     hints: MapSet.to_list(st.hints)
  #   }
  #
    %{
      isWin: st.isWin,
      guess: st.guess,
      guesses: st.guesses,
      hints: st.hints
    }
  end

  def is_win(guess, secret) do
    guess === secret
  end

  def rand_secret do
    nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    number = []
    rand_help(nums, number)
  end

  def rand_help(available, cur) do
    if length(cur) === 4 do

      # MapSet.new(cur)
      Enum.join(cur, "")
    else
      val = Enum.random(available)
      new_available = List.delete(available, val)
      new_cur = cur++[val]
      rand_help(new_available, new_cur)
    end
  end

  def get_hint(secret, guess, it, bulls, cows) do
    x = Enum.slice(String.split(secret, ""), 1, 5)
    y = Enum.slice(String.split(guess, ""), 1, 5)

    if (it === 5) do
      s = "A" <> Integer.to_string(bulls)
      s = s <> "B"
      s = s <> Integer.to_string(cows)
      s
    else
      if Enum.at(x, it) == Enum.at(y, it) do
        get_hint(secret, guess, it+1, bulls+1, cows)
      else
        if Enum.member?(x, Enum.at(y, it)) do
          get_hint(secret, guess, it+1, bulls, cows+1)
        else
          get_hint(secret, guess, it+1, bulls, cows)
        end
      end
    end
  end

# checks to see if the guess is a unique set of length 4
  def good_guess(guess) do
    x = Enum.slice(String.split(guess, ""), 1, 5)
    y = MapSet.new(x)
    z = MapSet.to_list(y)
    length(z) === 5
  end
end
