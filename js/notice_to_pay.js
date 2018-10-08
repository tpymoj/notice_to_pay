function hideAllCircles($allCircles) {
    $allCircles.css({
      "opacity": "0",
      "z-index": ""
    });
  };
  function showSpecificCircles(order) {
    var $circles = $([]);
    var name = "#paper-circle-";
    for(var i = 0; i < order.length; i++) {
      var $cir = $(name + order[i]);
      $cir.find(".paper-circle-no").html(i+1);
      $circles = $circles.add($cir);
    }
    $circles.css({
      "opacity": "1",
      "z-index": "1"
    });
  };
  function getIndexOfElement(e, set) {
    for(var i = 0; i < set.length; i++) {
      if(e == set[i]) { return i; }
    }
  };
  function getDisplayedPCD($poc) {
    var result = $([]);
    for(var i = 0; i < $poc.length; i++) {
      if($poc.eq(i).css("display") == "block") {
        // var $pcds = $poc.eq(i).find(".paper-circle-detail");
        // for(var j = 0; j < $pcds.length; j++) {
        //   result.push($pcds.eq(j));
        // }
        // return result;
        return $poc.eq(i).find(".paper-circle-detail");
      }
    }
  };
  function getDisplayedPCC($pcc) {
    var result = [];
    for(var i = 0; i < $pcc.length; i++) {
      if($pcc.eq(i).css("opacity") == 1) {
        result.push($pcc.eq(i)[0]);
      }
    }
    return result;
  };
  function getCorrespondPCC($pccs, index) {
    for(var i = 0; i < $pccs.length; i++) {
      if($($pccs[i]).find(".paper-circle-no").html() == index) {
        return $($pccs[i]);
      }
    }
  };
  window.onload = function() {
    
    $pot = $(".paper-option-title");
    $poc = $(".paper-option-content").hide();
    $pcc = $(".paper-circle-container").css("opacity", "0");
    $pcd = $(".paper-circle-detail");

    $(".paper-option-title").click(function() {
      $this = $(this);
      $target = $this.next();
      if(!$this.hasClass("active")) {
        $pot.removeClass("active");
        $poc.slideUp();
        $this.addClass("active")
        $target.slideDown();
      }
      return false;
    });
    $(".paper-option-title").eq(0).click(function() {
      var order = [1, 3, 7, 5, 4, 6];
      hideAllCircles($pcc);
      showSpecificCircles(order);
    });
    $(".paper-option-title").eq(1).click(function() {
      var order = [6, 11];
      hideAllCircles($pcc);
      showSpecificCircles(order);
    });
    $(".paper-option-title").eq(2).click(function() {
      var order = [3, 7];
      hideAllCircles($pcc);
      showSpecificCircles(order);
    });
    $(".paper-option-title").eq(3).click(function() {
      var order = [1, 8, 9, 10];
      hideAllCircles($pcc);
      showSpecificCircles(order);
    });
    $pcc.hover(function() {
      if($(this).css("opacity") == 1) {
        var $pccs = getDisplayedPCC($pcc);
        var index = $(this).find(".paper-circle-no").html();
        var $pcds = getDisplayedPCD($poc);
        $(this).css("z-index", "2");
        $(this).addClass("pcc-br-c-r").find(".paper-circle-no").addClass("pcc-bc-c-r");
        $pcds.eq(index - 1).addClass("pcd-br-c-r").find(".paper-detail-no").addClass("pcd-bc-c-r pcd-br-c-r");
      }
    }, function() {
      var $pccs = getDisplayedPCC($pcc);
      var index = $(this).find(".paper-circle-no").html();
      var $pcds = getDisplayedPCD($poc);
      if($(this).css("opacity") == 1) {
        $(this).css("z-index", "1");
        $(this).removeClass("pcc-br-c-r").find(".paper-circle-no").removeClass("pcc-bc-c-r");
        $pcds.eq(index - 1).removeClass("pcd-br-c-r").find(".paper-detail-no").removeClass("pcd-bc-c-r pcd-br-c-r");
      }
    });
    $pcd.hover(function() {
      var $pcds = getDisplayedPCD($poc);
      var index = getIndexOfElement(this, $pcds);
      var $pccs = getDisplayedPCC($pcc);
      $(this).addClass("pcd-br-c-r").find(".paper-detail-no").addClass("pcd-bc-c-r pcd-br-c-r");
      var $cpcc = getCorrespondPCC($pccs, index + 1);
      $cpcc.addClass("pcc-br-c-r").find(".paper-circle-no").addClass("pcc-bc-c-r");
      $cpcc.css("z-index", "2");
    }, function() {
      var $pcds = getDisplayedPCD($poc);
      var index = getIndexOfElement(this, $pcds);
      var $pccs = getDisplayedPCC($pcc);
      $(this).removeClass("pcd-br-c-r").find(".paper-detail-no").removeClass("pcd-bc-c-r pcd-br-c-r");
      var $cpcc = getCorrespondPCC($pccs, index + 1);
      $cpcc.removeClass("pcc-br-c-r").find(".paper-circle-no").removeClass("pcc-bc-c-r");
      $cpcc.css("z-index", "1");
    });
  };