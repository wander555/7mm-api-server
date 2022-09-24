const Common = new require("./Common");
class SevenApiServer extends Common {
  async getData(pageSize) {
    let url = "https://7mmtv.tv/zh/amateurjav_list/30/" + pageSize + ".html";
    console.log(url);
    let result = await this.request(url, {
      headers: {
        referer: url,
      },
    });

    let list = [];
    const $ = this.cheerio.load(result);
    var that = this;
    $(".col-6.col-md-4.col-lg-3.col-item").each(function (i, el) {
      let date = $(this).find(".small.text-muted").text();
      if (!date) return true;
      let totalTitle = $(this)
        .find(".video-title")
        .children("a")
        // .children("h2")
        .text();
      let prVideoUrl = $(this)
        .find(".video")
        .children("figure")
        .children("a")
        .children("video")
        .attr("data-src");
      let posterUrl = $(this)
        .find(".video")
        .children("figure")
        .children("a")
        .children("img")
        .attr("src");

      let number = totalTitle.split(" ")[0].trim();
      let title = totalTitle.split(number)[1].trim();

      //跳转的具体的页面地址
      let detailUrl = $(this).find(".video-title").children("a").attr("href");

      let id = detailUrl.split("/")[5];

      list.push({
        id: id,
        date: date,
        number: number,
        title: title,
        prVideoUrl: prVideoUrl,
        // realVideoUrl: realVideoUrl,
        posterUrl: posterUrl,
      });
    });

    return list;
  }
}
module.exports = SevenApiServer;
