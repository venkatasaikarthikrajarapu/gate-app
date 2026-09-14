import re

def normalize(s):
    s = re.sub(r"'s\b", "", s, flags=re.IGNORECASE)
    s = re.sub(r"[^a-z0-9\s]", " ", s.lower())
    return " ".join(s.split())

def lev(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0]*(n+1) for _ in range(m+1)]
    for i in range(m+1): dp[i][0] = i
    for j in range(n+1): dp[0][j] = j
    for i in range(1, m+1):
        for j in range(1, n+1):
            if s1[i-1] == s2[j-1]: dp[i][j] = dp[i-1][j-1]
            else: dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
    return dp[m][n]

def sim(s1, s2):
    n1 = normalize(s1)
    n2 = normalize(s2)
    if n1 == n2: return 1.0
    t1 = set(n1.split())
    t2 = set(n2.split())
    inter = t1.intersection(t2)
    min_len = min(len(t1), len(t2))
    tok_score = len(inter) / min_len if min_len > 0 else 0
    max_l = max(len(n1), len(n2))
    lev_score = 1.0 - lev(n1, n2) / max_l if max_l > 0 else 0
    contain_score = 1.0 if (n1 in n2 or n2 in n1) else 0.0
    return max(lev_score, 0.3*lev_score + 0.7*tok_score, 0.4*lev_score + 0.6*contain_score)

print('Dijkstra:', sim("Dijkstra Algorithm", "Dijkstra's Algorithm"))
print('Memory:', sim("Memory Management", "Memory Management Systems"))
print('Virtual:', sim("Virtual Memory", "Virtual Memory Management"))
