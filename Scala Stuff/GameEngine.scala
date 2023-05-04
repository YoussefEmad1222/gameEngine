
val GameEngine = (board: List[List[Char]], drawer: Function, controller: Function, multiplayer: Boolean) => {
    var currBoard = board
    Int player = 1
    Boolean incorrectInput = true
    String input = ""
    while(true){
        incorrectInput = true
        drawer(currBoard)
        while(incorrectInput){
            // Take input string
            val(currBoard, incorrectInput) = controller(input,player)
        }
        if multiplayer then{
            player = 3 - player
        }
    }
}

