import '../css/rankings.css';

function Rankings() {        

    return (
        <div className="rankingContainer">
            <div className="rankingContainer_top">
                <ul>
                    <li>사진</li>
                    <li>
                        <ul>
                            <li>1등</li>
                            <li><p>이름</p> : List</li>
                            <li><p>소속</p> : A.I 1팀</li>
                            <li><p>향상도</p> : 억양이 많이 자연스러워 짐</li>
                            <li><p>발음 정확도</p> : 90%</li>
                            <li><p>시뮬레이션 평가</p> : 전체 1등</li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div className="rankingContainer_bottom">
                <div>
                    정확도 그림
                </div>
            </div>
        </div>
    );
}

export default Rankings;