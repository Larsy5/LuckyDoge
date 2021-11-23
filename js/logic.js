function initWallectSuccess() {
    currentFomoPool().then(bnb => {
        $('.fomo-balance').text(bnb)
    })

    currentLottoPool().then(doge => {
        $('.doge-balance').text(doge)
    })

    fetchLatelyFomoWinner(3).then(winners => {
        if (winners && winners.length) {
            const hmlt = winners.map(({
                                          winner,
                                          fomoAward,
                                          openFomoTime
                                      }) => `<div>${winner} WON ${fomoAward} BNB IN ${openFomoTime}</div>`).join('')
            $('.lately-fomo-winner').html(hmlt)
        }
    })

    fetchLatelyLottoWinner(3).then(winners => {
        if (winners && winners.length) {
            const hmlt = winners.map(({
                                          winner,
                                          amount,
                                          settleTime
                                      }) => `<div>${winner} WON ${amount} DOGE IN ${settleTime}</div>`).join('')
            $('.lately-lotto-winner').html(hmlt)
        }
    })

    fetchLastBuyUser().then(last => {
        if (last) {
            let {amount, buyTime, fomoAward, openFomoTime, user, value} = last;
            $('.last-buy').html(`
                <div>
                     ${user} BUY ${amount} LUD about ${value} USDT IN ${buyTime}
                 </div>
                 <div> AND WILL </div>
                 <div> WIN ${fomoAward} BNB in ${openFomoTime} </div>
            `)
        }
    })
}
